import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User2, LogOut, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#034951] shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-white">
            Career<span className="text-[#E64833]">Pilot</span>
          </h1>
        </motion.div>

        {/* Desktop Menu */}
        <motion.div
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ul className="flex text-lg font-semibold items-center gap-6 text-[#48e8fa]">
            {user && user.role === "recruiter" ? (
              <>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/admin/companies">Companies</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/admin/jobs">Jobs</Link>
                </motion.li>
              </>
            ) : (
              <>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/">Home</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/jobs">Jobs</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/browse">Browse</Link>
                </motion.li>
              </>
            )}
          </ul>

          {/* Authentication & Profile */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="outline">Login</Button>
                </motion.div>
              </Link>
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="bg-[#E64833] hover:bg-[#bd1600]">
                    Signup
                  </Button>
                </motion.div>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-4 space-y-2"
                >
                  <Avatar className="mt-[11px]">
                    <AvatarImage
                      className=""
                      src={user?.profile?.profilePhoto}
                    />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </motion.div>

                <div className="flex flex-col gap-2 mt-4">
                  <Button className='bg-[#E64833]'>
                    <p onClick={() => navigate("/profile")}>View Profile</p>
                  </Button>
                  <Button onClick={logoutHandler} variant="link">
                    <LogOut /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#034951] border-t border-gray-700"
          >
            <ul className="flex flex-col items-center text-lg font-semibold gap-4 py-4 text-[#22acbb]">
              {user && user.role === "recruiter" ? (
                <>
                  <motion.li whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/admin/companies"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Companies
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/admin/jobs"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Jobs
                    </Link>
                  </motion.li>

                  <div onClick={logoutHandler}>Logout</div>
                </>
              ) : (
                <>
                  <motion.li whileHover={{ scale: 1.1 }}>
                    <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                      Home
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ scale: 1.1 }}>
                    <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>
                      Jobs
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ scale: 1.1 }}>
                    <Link to="/browse" onClick={() => setMobileMenuOpen(false)}>
                      Browse
                    </Link>
                  </motion.li>

                  <motion.li whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View Profile
                    </Link>
                  </motion.li>
                </>
              )}
            </ul>

            {/* Login/Signup Buttons for Mobile */}
            {!user ? (
              <div className="flex flex-col items-center gap-3 pb-4">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button variant="outline" className="w-40">
                      Login
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button className="bg-[#E64833] hover:bg-[#bd1600] w-40">
                      Signup
                    </Button>
                  </motion.div>
                </Link>
              </div>
            ) : (
             <div className="text-gray-100 flex flex-col items-center text-lg font-semibold p-2 ">
              <Button className='h-12 w-40 bg-[#E64833]'
                onClick={logoutHandler}
              >
                Logout
              </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
