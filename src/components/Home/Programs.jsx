import React, {useEffect} from "react";
import dumbell from "../../assets/icons/dumbell.png";
import biceps from "../../assets/icons/biceps.png";
import athlete from "../../assets/icons/athlete.png";
import yoga from "../../assets/icons/yoga.png";
import ScrollReveal from "scrollreveal";
import "./programs.css";

const Programs = () => {


  useEffect(() => {
    ScrollReveal().reveal('.program-list', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      interval: 100,
      reset: false,
    });
  }, []);

  return (
    <section className="programs" id='programs' >
      <div className="program-intro">
        <h3>Our Program</h3>
        <h2>
          <span className="program-span">Build Your</span> Best Body
        </h2>
      </div>  
      <div className="program-list-container">
        <div className="program-list">
          <div className="overlay">
            <img src={dumbell} alt="dumbell icon" />
            <span>Personal Training</span>
          </div>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
            maxime laudantium non ab dolorem ipsam quia, tenetur asperiores
            beatae eum numquam accusantium deleniti. Sit, modi! Aut ea modi
            minus doloremque.
          </p>
        </div>
        <div className="program-list">
          <div className="overlay">
            <img src={biceps} alt="muscle icon" />
            <span>Muscle Gaining</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            delectus recusandae ipsam tempora. Quaerat eum iure, quod expedita
            hic atque nulla debitis numquam quibusdam voluptas voluptates eius
            pariatur nostrum sunt.
          </p>
        </div>
        <div className="program-list">
          <div className="overlay">
            <img src={athlete} alt="athlete icon" />
            <span>Athlete</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum a,
            sapiente sunt excepturi exercitationem quas id ipsa? Aliquam velit
            natus, voluptatum omnis tempore ducimus veritatis possimus excepturi
            ipsam enim obcaecati!
          </p>
        </div>
        <div className="program-list">
          <div className="overlay">
            <img src={yoga} alt="yoga icon" />
            <span>Yoga Fitness</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            sunt, necessitatibus veritatis est sequi maiores quo dolorum beatae
            eligendi alias distinctio officia corrupti sapiente, unde error quas
            corporis tempore dignissimos?
          </p>
        </div>
      </div>
    </section>
  );
};

export default Programs;
