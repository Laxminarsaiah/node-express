module.exports = mongoose => {
    const ProductSchema = mongoose.Schema({
        userid: String,
        id: Number,
        name: String,
        description: String
    }, {
        timestamps: true
    });
    ProductSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("product", ProductSchema);
};