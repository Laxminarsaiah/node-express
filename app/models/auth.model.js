module.exports = mongoose => {
    const AuthSchema = mongoose.Schema({
        userid: String,
        password: String
    }, {
        timestamps: true
    });
    AuthSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("auth", AuthSchema);
};