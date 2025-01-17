import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }, []);
   const HandelDeleteProduct = (id) => {
     axios
       .delete(`https://dummyjson.com/products/${id}`)
       .then((response) => {
         console.log(response); 
         alert("Product deleted successfully!");
       })
       .catch((error) => {
         console.log(error);
       });
   };


  return (
    <>
      <motion.h1
        className="my-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Products
      </motion.h1>
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="row"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="col-12 my-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="btn btn-success"
              onClick={() => {
                Navigate("/add-product");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Add New Product
            </motion.button>
          </motion.div>
          <motion.div
            className="col-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {loading ? (
              <div className="d-flex justify-content-center vh-100">
                <motion.div
                  className="loader"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                ></motion.div>
              </div>
            ) : (
              <motion.table
                className="table table-hover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <thead>
                  <motion.tr
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Operations</th>
                  </motion.tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <motion.tr
                      key={product.id}
                      whileHover={{ scale: 1.02, backgroundColor: "#f8f9fa" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <td>{product.id}</td>
                      <td>{product.title}</td>
                      <td>{product.description.slice(0,20)}...</td>
                      <td>{product.price}</td>
                      <td>
                              <motion.button
                                  onClick={()=>{HandelDeleteProduct(product.id)}}
                          className="btn btn-danger"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Delete
                        </motion.button>
                        <motion.button
                        onClick={()=>{Navigate(`/Product-Detail/${product.id}`);}}
                          className="btn btn-info mx-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View
                        </motion.button>
                        <motion.button
                          className="btn btn-primary"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Edit
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Products;
