import express from 'express'
import 'dotenv/config'
import dbConnect from './dbConnect.js';
import { Book } from './models/booModel.js';
import {StatusCodes} from 'http-status-codes'
import cors from "cors"
// import {StatusCodes} from 'htt/'

const app=express();
  app.use(express.json());  
  app.use(cors());  
const PORT = process.env.PORT;


const start =  async ()=>{
  try {
   await dbConnect(process.env.MONGO_URL);
    console.log("Database connected");
    app.listen(PORT, ()=> {
      console.log("Server is started....");
    });
  } catch (error)
   {
    console.log(error)
  }
};

start();



// app.get("/book",(req,res)=>{
//   res.send("how may i help you");
// });


 app.post("/book",async (req, res)=>{
 
 try {
   const{title,author,year} = req.body;
   if(!title || !author || !year)
   { return res.json({msg : 'please provide title authour and year'});
  }
  await Book.create(req.body);
  res.json({msg : 'book added successfully'});
 } catch (error) {
     console.log("error");
     res
      .status(StatusCodes.BAD_GATEWAY)
      .json({msg: "INTERNAL SERVER ERROR , TRY AGAIN"});
 }

  
});

//  app.get("/book/:id" ,  async(req , res)=>{
// try {
//   const books = await Book.find();
//   if(!books){
//     return res.status(StatusCodes.Ok).json({msg: " books not avialable"});
//     res.status(StatusCodes.OK).json({count:books.length , data :books })
//   }
// } catch (error) {
//   console.log(error);
//   res.status(StatusCodes.BAD_REQUEST).json({msg: "internal server error"});
// }
// })

app.get("/book/:id",async (req,res)=>{
  try {
      const books=await Book.find();
      if(!books) return res.status(StatusCodes.OK).json({msg:"Book not available"});
      res.status(StatusCodes.OK).json({count:books.length,data:books});
      
  } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({msg:"Internal sever Error"});
      
  }
}
);


app.get("/book/:id" , async(req,res)=> {
  const {id} =req.params;
  try {
    const book = Book.findByid
    (id);
    if(!book){
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({msg : `book not found with id -${id}`})
      res.status(StatusCodes.OK).json({data: book})
    }
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.BAD_REQUEST).json({msg : " internal server error"});
  }

})




app.delete("/book/:id", async (req, res) => {
  
      const {id} = req.params;
      // console.log(id);
      try {
        const book = await Book.findByIdAndDelete(id);
        if(!book){
          return res.status(StatusCodes.NOT_FOUND).json({msg : `Book not found with ${id}`})
        }
        res.status(StatusCodes.OK).json({data: book});
      }
       catch (error) {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).json("Internal Server Error")
      }
});

app.put("/book/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  try {
    if (!title || !author || !year) {
      return res.status(500).json({
        success: false,
        message: "Please provide all the details",
      });
    }
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!result)
      return res.status(500).json({
        msg: `Book with id ${id} not found`,
        success: false,
      });
    res.status(200).json({
      msg: "Book Updated",
      success: true,
      result: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot update Book",
    });
  }
});
    
  

app.get("*",(req,res)=>{
  res.send("welcome to the book store");
});

