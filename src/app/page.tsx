import Camera from "@/components/Camera";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">SnapCart</h1>
      <p className="text-lg mb-8">Point your camera at an item to add it to your cart.</p>
      <Camera />
    </div>
  );
}
