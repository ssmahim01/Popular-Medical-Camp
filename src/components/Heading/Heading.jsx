const Heading = ({ title }) => {
  return (
    <div>
      <h2 className="md:text-4xl text-3xl font-extrabold mb-5">
        {title}
      </h2>
    </div>
  );
};

export default Heading;
