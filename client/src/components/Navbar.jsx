import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/CekSekitarMu.png" 

const userNavigation = [
  { name: "Home", href: "/" },
  { name: "Bulk Add Customer", href: "/bulkAddCustomer" },
];

const adminNavigation = [
  { name: "Home", href: "/" },
  { name: "Add Customer", href: "/addCustomer" },
  { name: "Bulk Add Customer", href: "/bulkAddCustomer" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigation, setNavigation] = useState(userNavigation);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setNavigation(adminNavigation);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.clear(); // Clear all local storage
    navigate("/login"); // Navigate to login page
  };

  return (
    <>
      <header className='flex h-16 border-b border-gray-900/10'>
        <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-1 items-center gap-x-6'>
            <button
              type='button'
              className='-m-3 p-3 md:hidden'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon
                className='h-5 w-5 text-gray-900'
                aria-hidden='true'
              />
            </button>
            <img
              className='h-8 w-auto'
              src={logo}
              alt='Your Company'
            />
          </div>
          <nav className='hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700'>
            {navigation.map((item, itemIdx) => (
              <NavLink
                key={itemIdx}
                to={item.href}
                className={({ isActive }) =>
                  classNames(
                    isActive ? "text-indigo-600" : "",
                    "hover:text-gray-900"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className='flex flex-1 items-center justify-end gap-x-8'>
            {/* <button
              type='button'
              className='-m-2.5 p-2.5 text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>View notifications</span>
              <BellIcon
                className='h-6 w-6'
                aria-hidden='true'
              />
            </button> */}
            <Menu
              as='div'
              className='relative ml-3'
            >
              <div>
                <Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                  <span className='sr-only'>Open user menu</span>
                  <img
                    className='h-8 w-8 rounded-full border'
                    src='https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833572.jpg?t=st=1720783897~exp=1720787497~hmac=be7d4f5cb595b4c7923ea72dcbb3c86daef163d595b4c365edd608da3fedaac8&w=740'
                    alt=''
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  {/* <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item> */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block w-full text-left px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <Dialog
          as='div'
          className='lg:hidden'
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className='fixed inset-0 z-50' />
          <Dialog.Panel className='fixed inset-y-0 left-0 z-50 w-2/3 shadow overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10'>
            <div className='-ml-0.5 flex h-16 items-center gap-x-6'>
              <button
                type='button'
                className='-m-2.5 p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon
                  className='h-6 w-6'
                  aria-hidden='true'
                />
              </button>
              <div className='-ml-0.5'>
                <a
                  href='#'
                  className='-m-1.5 block p-1.5'
                >
                  <span className='sr-only'>Your Company</span>
                  <img
                    className='h-8 w-auto'
                    src={logo}
                    alt=''
                  />
                </a>
              </div>
            </div>
            <div className='mt-2 space-y-2'>
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive ? "bg-gray-100" : "",
                      "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    )
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}
