const Heading = ({ title, center }) => {
  return (
    <div>
      <h2 className={`md:text-4xl ${center ? "text-center" : "text-left"} text-3xl font-extrabold mb-5`}>
        {title}
      </h2>
    </div>
  );
};

export default Heading;
