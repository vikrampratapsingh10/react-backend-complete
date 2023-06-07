import { Product } from "../model/product.model.js";


export const Save = async (request, response, next) => {
    try {
        await Product.create(request.body.products); 
        return response.status(200).json({ message: "Product saved...", status: true });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const productListBySellerId = async (request, response, next) => {
    try {
        let result = await Product.find({ sellerId: request.params.sellerId })
        return response.status(200).json({ productsList: result, status: true })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
    }
}

export const updateProduct = async (request, response, next) => {
    console.log("xcvbn")
    try {
        const product = await Product.findById(request.params._id);
        if (product) {
            product.title = request.body.title || product.title;
            product.description = request.body.description || product.description;
            product.price = request.body.price || product.price;
            product.stock = request.body.stock || product.stock;
            product.discountPercentage = request.body.discountPercentage || product.discountPercentage;
            const updatedProduct = await product.save();
            return response.status(200).json({ updatedProduct: updatedProduct, staus: true });
        }
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

export const updateproducts = async (request, response, next) => {
    try {
        let result = await Product.updateMany({ _id: request.params._id }, { title: request.body.title, description: request.body.description, price: request.body.price, stock: request.body.stock, discountPercentage: request.body.discountPercentage });
        return response.status(200).json({ result: result, status: true })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
    }
}

export const removeProduct = async (request, response, next) => {
    try {
        let status = await Product.deleteOne({ _id: request.params._id });
        return response.status(200).json({ message: "Product removed", status: true })

    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Internal server error", status: false });
    }
}

export const viewProduct = async (request, response, next) => {
    try {
        let product = await Product.find()
        if(!product)
        return response.status(401).json({ products:"Product not Found", status: true });
        return response.status(200).json({ products: product, status: true });
       
    } catch (err) {
        return response.status(500).json({ error: "Internal Server", status: false });
    }
}


export const InfProduct = async (request, response, next) => {
    let page = parseInt(request.query.page) || 1;
    let perPage = 10;
    Product.find().skip((page-1)*10).limit(9).
    then(result=>{
        return response.status(200).json({products: result, status: true});
    }).catch(err=>{
        return response.status(500).json({error:"Internal Server Error", status: false});
    })
}

export const featuresProduct = async (request, response, next) => {
    try {
        let product = await Product.find().limit(8)
        // console.log(product)
        return response.status(200).json({ products: product, status: true });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server", status: false });
    }
}

export const getProductById =async (request, response, next) => {
    try{
       const  product=await Product.findById(request.params.id).populate({
         path: 'reviews' ,populate:{path:"customer"}
       })
       return response.status(200).json({ product: product, status: true });  
       }
      catch{
            return response.status(500).json({ error: "Internal Server", status: false });
          }
}

export const addPage = (request, response, next) => {
    response.render("image.ejs");
}

export const getProductByCategory = (request, response, next) => {
    Product.find({ categoryId: request.params.categoryId })
        .then(result => {
            return response.status(200).json({ products: result, status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal Server", status: false });
        })
}

export const productAdd = (request, response, next) => {
    try {
        // console.log(request.files);
        let thumbnail = null;
        let images = [];
        request.files.map(file => {
            if(file.fieldname!="file")
                images.push(file.filename)
            else
                thumbnail = file.filename
        });
        let { title, description, price, discountPercantage, rating, stock, categoryId, sellerId, keyword } = request.body
        Product.create(({ images: images, thumbnail: thumbnail, price: price, title: title, description: description, discountPercentage: discountPercantage, rating: rating, stock: stock, categoryId: categoryId, sellerId: sellerId, keyword: keyword }))
        return response.status(200).json({ message: "saved...", status: true });

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}

export const search = async (request, response, next) => {
    try {
        let searchResult = await Product.find({
            $or: [{ title: { $regex: request.params.keyword, $options: "i" } },
            { keyword: { $regex: request.params.keyword, $options: "i" } },
            { description: { $regex: request.params.keyword, $options: "i" } }]
        })
        if (searchResult.length > 0)
            return response.status(200).json({ Product: searchResult, status: true })
        else
            return response.status(401).json({ result: "NO result found", status: false })
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: err, status: false })
    }
}
export const  createProductReview=async(request,response)=>{
   const {rating,comment,productId}=request.body
   const product=await Product.findById(productId)

   if(product){
    const alreadyReviewed=product.reviews.find(
        (r)=>r.customer.toString()===request.body.customerId.toString()
    )
    if(alreadyReviewed){
        return response.status(200).json({message:"'Product already reviewed'",staus:false})
    }
    const review={
        rating:Number(rating),
        comment,
        customer:request.body.customerId,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length

    await product.save()
    return response.status(201).json({message:"Review submitted",status:true})
    }
    else{
        return response.status(400).json({message:"Product Not FOund"})
    }
   }