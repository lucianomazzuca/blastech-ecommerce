import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import imgNotAvailable from '../../img/not_available.png';

const ProductRow = ({ product, handleDelete }) => {
  const parsedDate = DateTime.fromISO(product.createdAt).toLocaleString(
    DateTime.DATE_SHORT
  );

  let imgSrc;

  if (process.env.REACT_APP_API_URL) {
    imgSrc = `${process.env.REACT_APP_API_URL}/img/uploads/${product.image}`;
  } else {
    imgSrc = `http://localhost:5000/img/uploads/${product.image}`;
  }

  return (
    <div className="grid grid-cols-12 border-b border-gray-300 hover:bg-gray-100">
      <div className="col-span-1 p-2">{product.id}</div>
      <div className="col-span-2 p-2">
        <img
          src={product.image ? imgSrc : imgNotAvailable}
          alt="Product"
          className="w-full h-32 object-cover object-center"
        ></img>
      </div>
      <div className="col-span-2 p-2">{product.model}</div>
      <div className="col-span-2 p-2">{product.brand ? product.brand.name : ''}</div>
      <div className="col-span-2 p-2">{product.category ? product.category.name : ''}</div>
      <div className="col-span-2 p-2">{parsedDate}</div>
      <div className="col-span-1 p-2 flex space-x-3 items-start">
        <Link to={`/admin/products/edit/${product.id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 text-green-600"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <button className="inline-block" onClick={async () => await handleDelete(product.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 text-red-700"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
