import Nav from './Nav';

const index: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 py-4 min-h-16 bg-gray-50">
      <div className="flex flex-wrap items-center justify-between max-w-6xl px-4 mx-auto">
        <h1 className="text-2xl font-semibold">Logo</h1>

        <Nav />
      </div>
    </header>
  );
};

export default index;
