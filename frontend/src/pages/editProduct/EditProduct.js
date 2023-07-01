import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/product/productSlice';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';
const EditProduct = () => {
    const {id} =useParams();
     
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading=useSelector(selectIsLoading)

    const productEdit=useSelector(selectProduct)

    const [product,setProduct]=useState(productEdit);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(()=>{
        dispatch(getProduct(id))
    },[dispatch,id]) //dependecies(requirements of the useEffect)
    //if refreshed datas are fetched from the db

    useEffect(()=>{
        setProduct(productEdit)

        setImagePreview(
            productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
        )

        setDescription(
            productEdit && productEdit.description ? productEdit.description : ""
        )
    },[productEdit])


    const handleInputChange=(e)=>{
        const {name,value} =e.target; //access name value of input text box
        setProduct({...product,[name]:value}); //properties of product,destruction from properties of product
    };

    const handleImageChange =(e)=>{

        setProductImage(e.target.files[0]);//array of files get the first value
        setImagePreview(URL.createObjectURL(e.target.files[0])); //temporary preview of image using url first image=>[0]
    };

    const saveProduct = async(e)=>{
        e.preventDefault();
        const formData=new FormData(); //image cannot access a normal object {} so new for...
        formData.append("name",product?.name); //if name property exist append it
        formData.append("category",product?.category);
        formData.append("quantity",product?.quantity);
        formData.append("price",product?.price);
        formData.append("description",description);

        if(productImage)
        {
            formData.append("image",productImage);
        }
    
        
        console.log(...formData);

       await dispatch(updateProduct({formData,id}));
        await dispatch(getProducts())
        navigate("/dashboard");
        
    };

    
  
    return (
        <div>
            {isLoading && <Loader/>}
          <h3 className='--mt'>Edit Product </h3>
    
          <ProductForm
          product={product} //props
          productImage={productImage}
          imagePreview={imagePreview}
          description={description}
          setDescription={setDescription}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveProduct={saveProduct}
          
          />
        </div>
  )
}

export default EditProduct
