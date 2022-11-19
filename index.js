import express from "express";
import mongoose from "mongoose";

const app = express();

const con = mongoose.createConnection("mongodb+srv://Smile:SamuelSam90@cluster0.sp2jdlg.mongodb.net/?retryWrites=true&w=majority");

con.on("connected", async () => {
    console.log("Connected to mongodb")
});

const dogSchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    image: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String
});

const dogs = con.model("dogs", dogSchema);

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    const result = await dogs.find({});
    res.render("index", { result })
})

app.listen(3000)