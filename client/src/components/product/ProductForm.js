import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "../ErrorMsg";
import { axiosFileAuth } from "../../axios";
import setErrorFromServer from "../../utils/setErrorFromServer";
import axios from "axios";

const ProductForm = ({ previousValues }) => {
  const { register, handleSubmit, errors, setError } = useForm({
    defaultValues: previousValues,
  });
  const history = useHistory();

  const onSubmit = async (values) => {
    console.log(values)
    const formData = new FormData();
    formData.append('image', values.image[0]);

    console.log(formData)
    
    try {
      if (previousValues) {
        await axiosFileAuth.put(`/products/${previousValues.id}`, formData);
      } else {
        await axiosFileAuth.post("/products", formData);
      }
      // history.push("/admin/products");
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        history.push("/");
      } else {
        console.log(err.response)
        // const errorServer = err.response.data.errors;
        // setErrorFromServer(errorServer, setError);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="form-user"
    >
      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Name
        </label>

        <input
          name="name"
          ref={register({
            required: "Name is empty",
          })}
          className="input"
        />
        {errors.name && <ErrorMsg error={errors.name.message} />}
      </div>

      <label htmlFor="" className="text-gray-600">
        Image
      </label>
      <input type="file" name="image" ref={register} />

      <button className="btn-primary px-10">Save</button>
    </form>
  );
};

export default ProductForm;
