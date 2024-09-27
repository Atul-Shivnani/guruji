const Heading = ({ text }) => {
    return (
      <h1 className="text-lg md:text-xl lg:text-2xl p-2 border-purple-300 rounded-lg shadow-xl border font-semibold bg-white bg-opacity-25">
        {text}
      </h1>
    );
  };
  
  export default Heading;
  