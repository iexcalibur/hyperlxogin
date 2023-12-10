import Container from "../Container";

interface NavbarProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

const Navbar:React.FC<NavbarProps> = ({activeComponent, setActiveComponent}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <Container>
        <div className="">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0 ">
            <div className="bg-rose-500 h-16 flex items-center justify-center">
              <a href="/">
                <div className="text-xl font-bold text-white px-4 py-2">ImpactHub</div>
              </a>
            </div>

            {/* Sign In and Sign Up on the Right */}
            <div className="flex flex-row gap-4">
            <button 
                className={`px-4 py-2 rounded-md bg-transparent hover:bg-rose-100 ${activeComponent === 'SignIn' ? 'text-rose-500' : 'text-gray-500'}`} 
                onClick={() => setActiveComponent('SignIn')}
              >
                Sign In
              </button>
              <button 
                className={`px-4 py-2 rounded-md bg-transparent hover:bg-rose-100 ${activeComponent === 'SignUp' ? 'text-rose-500' : 'text-gray-500'}`}
                onClick={() => setActiveComponent('SignUp')}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
