import ContactForm from "./ContactForm";
const About = () => {
  
    return (
      <div
        className="grid-container"
        style={{
          display: "grid",
          marginTop: "30px",
          color: "#0b213f",
          justifyContent: "space-between",
          textAlign: "left",
          margin: "30px",
        }}
      >
        <div
          style={{
            fontFamily: "cursive",
            fontSize: "1.2rem",
            color: "#22334F",
          }}
          className='md:text-xs'
        >
          <p>Animal shelter "Tina" 🌹 </p>
          <p>Contact: +3851239874</p>
          <p>Ruđera Boškovića 32, 21000 Split</p>
        </div>
        <div className="mapImageContainer" style={{ gridColumn: "2/3" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.5688127917533!2d16.466808015493143!3d43.51132987912642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355e3cbb175f2d%3A0x505534f00924e86!2sFakultet%20elektrotehnike%2C%20strojarstva%20i%20brodogradnje%20u%20Splitu!5e0!3m2!1shr!2shr!4v1682776178108!5m2!1shr!2shr"
            style={{width: "600px", height: "450px"}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div style={{ gridColumn: "3/4", marginLeft: "30px", fontFamily: "cursive" }}>Leave a comment here: 
        <ContactForm />
        </div>
      </div>
    );

}; export default About