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
    public async getMyHotelById () {
        return await Hotel.find({});
    }
    public async getMyHotels () {
        return await Hotel.find({});
    }
    public async updateMyHotel () {
        return await Hotel.find({});
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