import { GiCancel } from "react-icons/gi";
import { MdGroupAdd } from "react-icons/md";

const CampJoinForm = ({ joinCamp, user, onSubmit, handleSubmit, register, errors }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Camp Name */}
      <div className="form-control">
        <label className="label-text font-bold">Camp Name</label>
        <input
          type="text"
          value={joinCamp?.campName}
          readOnly
          className="input input-bordered w-full"
        />
      </div>

      {/* Camp Fees */}
      <div className="form-control">
        <label className="label-text font-bold">Camp Fees</label>
        <input
          type="number"
          value={joinCamp?.fees}
          readOnly
          className="input input-bordered w-full"
        />
      </div>

      {/* Location */}
      <div className="form-control">
        <label className="label-text font-bold">Location</label>
        <input
          type="text"
          value={joinCamp?.location}
          readOnly
          className="input input-bordered w-full"
        />
      </div>

      {/* Healthcare Professional Name */}
      <div className="form-control">
        <label className="label-text font-bold">
          Healthcare Professional Name
        </label>
        <input
          type="text"
          value={joinCamp?.professionalName}
          readOnly
          className="input input-bordered w-full"
        />
      </div>

      {/* Participant Name */}
      <div className="form-control">
        <label className="label-text font-bold">Participant Name</label>
        <input
          type="text"
          value={user?.displayName}
          readOnly
          className="input input-bordered w-full"
        />
      </div>

      {/* Participant Email */}
      <div className="form-control">
        <label className="label-text font-bold">Participant Email</label>
        <input
          type="email"
          value={user?.email}
          readOnly
          className="input input-bordered w-full"
        />
      </div>

      {/* Age */}
      <div className="form-control">
        <label className="label-text font-bold">Age</label>
        <input
          type="number"
          {...register("age", {
            required: "Age is required",
          })}
          className="input input-bordered w-full"
        ></input>
        {errors.age && (
          <p className="text-rose-500 font-semibold mt-2">
            {errors.age.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div className="form-control">
        <label className="label-text font-bold">Phone Number</label>
        <input
          type="number"
          {...register("number", {
            required: true,
            minLength: 11,
            maxLength: 11,
          })}
          className="input input-bordered w-full"
        ></input>

        {errors.number?.type === "required" && (
          <p className="text-rose-500 font-semibold mt-2">
            Phone number is required
          </p>
        )}

        {errors.number?.type === "minLength" && (
          <p className="text-rose-500 font-semibold mt-2">
            Phone number must be 11 digit
          </p>
        )}
        {errors.number?.type === "maxLength" && (
          <p className="text-rose-500 font-semibold mt-2">
            Phone number limit is 11 digit
          </p>
        )}
      </div>

      {/* Gender */}
      <div className="form-control">
        <select
          className="select select-info w-full max-w-xs"
          {...register("gender", { required: "Gender is required" })}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
          <option value={"Other"}>Other</option>
        </select>

        {errors.gender && (
          <p className="text-rose-500 font-semibold mt-2">
            Please select a gender
          </p>
        )}
      </div>

      {/* Emergency Contact */}
      <div className="form-control">
        <label className="label-text font-bold">Emergency Contact</label>
        <input
          type="number"
          {...register("emergencyContact", {
            required: true,
            minLength: 11,
            maxLength: 11,
          })}
          className="input input-bordered w-full"
        ></input>

        {errors.emergencyContact?.type === "required" && (
          <p className="text-rose-500 font-semibold mt-2">
            Emergency contact is required
          </p>
        )}

        {errors.emergencyContact?.type === "minLength" && (
          <p className="text-rose-500 font-semibold mt-2">
            Emergency contact must be 11 digit
          </p>
        )}
        {errors.emergencyContact?.type === "maxLength" && (
          <p className="text-rose-500 font-semibold mt-2">
            Emergency contact limit is 11 digit
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="py-3 flex gap-4 justify-center items-center">
        <button className="form-control flex gap-2 items-center md:px-14 px-6 btn bg-cyan-600 hover:bg-cyan-800 rounded text-white font-bold">
          <span className="text-lg">Join Now</span>{" "}
          <MdGroupAdd className="text-xl" />
        </button>

        <button
          onClick={() => document.getElementById("join_camp_01").close()}
          className="flex gap-2 items-center md:px-14 px-6 btn btn-error text-white font-bold rounded"
        >
          <span className="text-lg">Cancel</span>
          <GiCancel className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default CampJoinForm;
