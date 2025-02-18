import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useState } from "react";
import ShowImages from "../../components/ShowAiImages/ShowImages";
import useImages from "../../hooks/useImages";
import Loading from "../../components/Loading/Loading";

const GenerateImage = () => {
  const { user, logInWithGoogle, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [imageData, setImageData] = useState([]);
  const [, , refetch] = useImages();
  // console.log(imageData.data.url);
  const imgBB_api = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_API_KEY
  }`;

  const checkUser = () => {
    if (!user) {
      Swal.fire({
        title: "Please Login",
        text: "Join as a Creator with One Click",
        imageUrl: "https://img.icons8.com/?size=100&id=szz75vJoS2OI&format=gif",
        imageHeight: "80px",
        imageAlt: "Custom image",
        showCancelButton: true,
        confirmButtonText: `Login using Google`,
        confirmButtonColor: "#149b9b",
      }).then((res) => {
        if (res.isConfirmed) {
          logInWithGoogle()
            .then((res) => {
              const user = res.user;
              // console.log(user);
              Swal.fire("success", "Welcome to this page", "success");
            })
            .catch((err) => {
              // console.log(err);
            });
        }
      });
      return false;
    } else {
      return true;
    }
  };

  const options = [
    "Painting",
    "Animated-image",
    "Wallpaper",
    "Poster",
    "Digital-art",
    "Realistic-image",
  ];

  const validationForm = (prompt, category) => {
    if (!category) {
      Swal.fire(
        "Select Category",
        "Select a Category from the dropdown",
        "error"
      );
      return false;
    }
    if (!prompt) {
      Swal.fire("Write a Prompt", "Write a prompt in the input", "error");
      return false;
    }
    if (!prompt) {
      Swal.fire("Write a Prompt", "Write a prompt in the input", "error");
      return false;
    }
    if (prompt.trim().length < 20) {
      Swal.fire(
        "Invalid Prompt",
        "make your prompt bigger (minimum 20 character)",
        "error"
      );
      return false;
    }

    return true;
  };

  const getImageBuffer = async (prompt, category) => {
    const finalPrompt = `imagine a ${category} : ${prompt}`;
    const myForm = new FormData();
    myForm.append("prompt", finalPrompt);

    const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key": import.meta.env.VITE_CD_KEY,
      },
      body: myForm,
    });
    const buffer = await response.arrayBuffer();
    if (buffer) return generateImageUrl(buffer, prompt);
  };

  const generateImageUrl = async (buffer, prompt) => {
    const formData = new FormData();
    formData.append(
      "image",
      new Blob([buffer], { type: "image/png" }),
      `${prompt}.png`
    );

    const response = await fetch(imgBB_api, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    // console.log(data);
    setImageData(data);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const prompt = form.prompt.value;
    const category = form.category.value;

    if (!validationForm(prompt, category)) return;
    if (!checkUser()) return;
    if (!getImageBuffer(prompt, category)) return;
    setLoading(true);
    // console.log({ prompt, category });

    const generatedData = {
      username: user?.displayName || "Anonymous",
      email: user?.email,
      userImg:
        user?.photoURL || "https://img.icons8.com/stickers/40/test-account.png",
      prompt,
      category,
      originalImg: imageData.data.url,
      generatedImg: imageData.data.thumb.url,
      mediumImg: imageData.data.medium.url,
      createdAt: new Date().toISOString(),
    };

    const response = await axiosSecure.post("/generate", generatedData);
    if (response.data.insertedId) {
      form.reset();
      refetch();
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${prompt} has been generated`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="lg:w-4/5 w-11/12 mx-auto py-10">
      <div className="flex justify-center py-5">
        <img
          src="medical-doctor.png"
          alt="Image of a doctor"
          className="animate-bounce w-32 h-32"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="join w-full md:flex-row flex-col justify-center flex-wrap"
      >
        <div className="md:flex-1">
          <div>
            <input
              name="prompt"
              className="input w-full input-bordered md:join-item outline-none focus:outline-none focus:border-primary"
              placeholder="Write , What's on your Mind🧠🧠"
            />
          </div>
        </div>
        <div className="md:mt-0 mt-2 md:mx-0 mx-auto">
          <select
            name="category"
            className="select select-bordered join-item max-w-max outline-none focus:outline-none focus:border-primary font-semibold"
          >
            <option value="">Select a Category</option>
            {options.map((opt) => (
              <option key={opt} value={opt} className="font-semibold">
                {opt}
              </option>
            ))}
          </select>
          <div className="indicator">
            <button className="btn join-item bg-emerald-500 border-none font-bold text-white rounded-md">
              Generate
            </button>
          </div>
        </div>
      </form>

      <ShowImages />
    </div>
  );
};

export default GenerateImage;
