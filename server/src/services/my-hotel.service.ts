import AuthenticationError from "#errors/AuthenticationError.js";
import EntityNotFoundError from "#errors/EntityNotFoundError.js";
import Hotel, {IHotel} from "#models/hotel.model.js";
import cloudinary from "cloudinary"

class myHotelService {
   public async createHotelWithImages(
        imageFiles: Express.Multer.File[],
        newHotel: IHotel,
        userId: string
    ) {
        //1. Upload images to cloudinary
        const imageUrls = await this.uploadImages(imageFiles);

        //2. if upload success, add URLs to new hotel
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = userId;

        //3. save new hotel in database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        return hotel;
    }
    public async getMyHotelById (hotelId : string, userId : string) {
        return await Hotel.findOne({_id : hotelId, userId});
    }
    public async getMyHotels (userId : string) {
        if(!userId) {
            throw new AuthenticationError({
                code : "ERR_AUTH",
                message : "User not found",
                statusCode : 404,
            })
        }
        return await Hotel.find({userId});
    }
    public async updateMyHotel (        
        imageFiles: Express.Multer.File[],
        updateHotel: IHotel,
        userId: string,
        hotelId : string
    ) {
        const existingHotel = await Hotel.findOneAndUpdate({
            userId,
            _id : hotelId
        }, updateHotel, {new : true})

        if(!existingHotel){
            throw new EntityNotFoundError({
                code : "ERR_NF",
                message : "Hotel not Found!",
                statusCode : 404
            })
        }

        const updatedImageUrls = await this.uploadImages(imageFiles);
        console.log(updateHotel.imageUrls);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!updateHotel.imageUrls) {
        // User didn’t send imageUrls → keep existing ones
        existingHotel.imageUrls = [
            ...updatedImageUrls,
            ...existingHotel.imageUrls, // preserve old
        ];
        } else {
        // User sent something (could be [] or some URLs)
        existingHotel.imageUrls = [
            ...updatedImageUrls,
            ...updateHotel.imageUrls,
        ];
        }

        await existingHotel.save()
        return existingHotel
    }
    
    private async  uploadImages(imageFiles: Express.Multer.File[]) {
        //chaneg image files into base64 & upload to cloudinary
        const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        const dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
        });

        const imageUrls = await Promise.all(uploadPromises);
        return imageUrls;
    }
}

export default new myHotelService();