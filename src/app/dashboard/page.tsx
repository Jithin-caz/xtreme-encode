import Dash from "@/components/ui/dash";
import Navbar from "@/components/ui/navbar";
import Register from "@/components/ui/register";

export default function Dashboard() {
  return (
    <div className="text-white">
      <Navbar></Navbar>
      <Register></Register>
      {/* <Dash></Dash> */}
    </div>
  );
}
