import { Fab } from "@mui/material";
import { Link } from "react-router-dom";
import errorImg from "../assets/error.svg";

interface ErrorPageProps {
  image?: string;
  title?: string;
  description?: string;
  hideLink?: boolean;
  linkTo?: string;
  linkText?: string;
}

function ErrorPage({
  image = errorImg,
  title = "Oops!",
  description = "Looks like something went wrong. Please try again later.",
  hideLink = false,
  linkTo = "/",
  linkText = "Take me home!",
}: ErrorPageProps) {
  return (
    <main
      data-testid="error-page"
      className="p-10 flex flex-col items-center h-full"
    >
      <object
        role="img"
        type="image/svg+xml"
        data={image}
        className="max-h-[500px] "
      />
      <h2 className="text-3xl my-5">{title}</h2>
      <p className="mb-8 opacity-70">{description}</p>
      {!hideLink && (
        <Fab
          variant="extended"
          color="primary"
          LinkComponent={Link}
          href={linkTo}
          sx={{ width: "200px" }}
        >
          {linkText}
        </Fab>
      )}
    </main>
  );
}

export default ErrorPage;
