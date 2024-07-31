import { useEffect, useState } from "react";
import { Spinner, Toast, ToastHeader, Card, CardBody, CardHeader } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";



export default function Albums() {
  const navigate = useNavigate();
  const [albumsList, setAlbumsList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API or database
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => {
        setAlbumsList(data);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <Spinner color="primary" size="sm">
            Loading...
          </Spinner>
          <Spinner color="primary" size="sm" type="grow">
            Loading...
          </Spinner>
        </div>
      ) : (
        ""
      )}
      {albumsList.map((item, index) => (
        // <Link key={`${index}`} to={"/AlbumsDetails/" + item?.id}>
        <Card
          key={`${index}`}
          className="cardHover"
          style={{
            width: "18rem",
            backgroundColor: "#9DD4EC",
          }}
          onClick={() => navigate("/AlbumsDetails/" + item.id)}
        >
          <CardBody>
            <CardHeader>
              <span className="text-primary">{index + 1}).</span> {item.title}
            </CardHeader>
          </CardBody>
        </Card>
        // </Link>
      ))}
      {error ? (
        <div className="p-3 bg-danger my-2 rounded">
          <Toast>
            <ToastHeader>{error}</ToastHeader>
          </Toast>{" "}
        </div>
      ) : null}
    </div>
  );
}