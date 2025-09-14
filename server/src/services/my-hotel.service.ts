import Hotel, {IHotel} from "#models/hotel.model.js";

class myHotelService {
    public async createMyHotel (productData : IHotel) {
        const newProduct = await Hotel.create(productData);
        return newProduct;
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
}

export default new myHotelService();