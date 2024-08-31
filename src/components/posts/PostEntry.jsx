import { useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import Field from "../common/Field";

export default function PostEntry({ onCreate }) {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();

  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Updated submit function to handle form data including the file
  const handlePostSubmit = async (data) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const formData = new FormData();
    formData.append("content", data.content);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.DATA_CREATED,
          data: response.data,
        });
        // Close this UI
        onCreate();
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.message || "An error occurred",
      });
    }
  };

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>
              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="image"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
