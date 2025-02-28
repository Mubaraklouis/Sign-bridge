const LearnSignLanguagePage = () => {
  return (
    <>
      <section className="container py-8 md:pb-14 bg-red-600 mx-auto">
        <h1>Learning Tools</h1>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 lg:px-20 md:px-8 px-2 ">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-lg bg-primary_main shadow-md"
            ></div>
          ))}
        </div>
      </section>
    </>
  );
};

export default LearnSignLanguagePage;
