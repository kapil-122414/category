const Cards = (props) => {

  return (
    
      <div className="parent">
        <div className="child">
          
          <div className="top">
            <div><img src={props.brandLogo} alt="" /></div>
            <div>save</div>
          </div>

          <div className="center">
            <h2>
              {props.company} <span>5 day ago</span>
            </h2>
            <p>{props.jobTitle}</p>

            <div>
              <div>Part Time</div>
              <div>Senior level</div>
            </div>
          </div>

          <div className="bottom">
            <div>
              <h3>{props.pay}</h3>
              <p>{props.location}</p>
            </div>
            <div>
              <button>Apply Now</button>
            </div>
          </div>

        </div>
      </div>
    
  );
};

export default Cards;