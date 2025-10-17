'use client';

import { useRef, useState, useCallback } from 'react';

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const takePicture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPhoto(dataUrl);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const addToCart = () => {
    if (photo) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const newItem = {
        id: Date.now(),
        name: `Item ${cart.length + 1}`,
        price: (Math.random() * 100).toFixed(2), // Placeholder price
        image: photo,
      };
      cart.push(newItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      setPhoto(null);
      alert('Item added to cart!');
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!stream && !photo && (
        <button
          onClick={startCamera}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Camera
        </button>
      )}
      {stream && (
        <>
          <video ref={videoRef} autoPlay className="w-full max-w-md rounded" />
          <button
            onClick={takePicture}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Take Picture
          </button>
          <button
            onClick={stopCamera}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Stop Camera
          </button>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
      {photo && (
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">Captured Image</h2>
          <img src={photo} alt="Captured" className="w-full max-w-md rounded" />
          <div className="mt-4">
            <button
              onClick={addToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setPhoto(null)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
