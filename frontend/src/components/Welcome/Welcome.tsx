//css
import welcome from "./style.module.css";
//bootstrap
import Container from "react-bootstrap/Container";

const Welcome = () => {
  return (
    <>
      <Container fluid>
        <div className={`${welcome.WelcomeWrapper} `}>
          <div className={`${welcome.texts} d-none d-sm-block`}>
            <h2 style={{ textTransform: "uppercase" }}>Welcome</h2>
            <p className={welcome.paragraph}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              fugiat animi laboriosam veritatis quibusdam in quis rem eius quas
              corporis!
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Welcome;
