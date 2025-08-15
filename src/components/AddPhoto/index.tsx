import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  MouseEvent,
} from "react";
import "./index.css";
import viewicon from "assets/viewicon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addPhoto,
  deletePhoto,
  fetchPhotos,
  updatePhoto,
} from "slicers/photos_slicer";
import { AppDispatch, RootState } from "store";
import {
  CoverEntityDto,
  PhotoEnityDto,
  PhotoService,
  UplaodService,
} from "generated";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import horizontal from "assets/horizontal.png";
import square from "assets/square.png";
import vertical from "assets/vertical.png";
import uploadicon from "assets/upload-icon.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const AddPhoto = () => {
  const { templateId, photoId } = useParams();
  const [photoDate, setPhotoDate] = useState<Date | null>(null);
  const [photoDescription, setPhotoDescription] = useState<string>("");
  const [photoPosition, setPhotoPosition] = useState<string>("center");
  const [photoFile, setPhotoFile] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const coverData = useSelector<RootState, CoverEntityDto | null>(
    (state) => state.cover.value
  );

  const [hideDate, setHideDate] = useState<boolean>(false);
  const [hideDescription, setHideDescription] = useState<boolean>(false);
  const [questionTxt, setQuestionTxt] = useState<string>("");
  const [questions, setQuestions] = useState<
    { number: number; question: string }[]
  >([]);

  const [notify, setNotify] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (templateId) {
      const fetchQuestionsAndAnswers = async () => {
        try {
          const [questionsResponse, answersResponse] = await Promise.all([
            fetch(`https://api.comabooks.org/questions/${templateId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }).then((res) => res.json()),
            fetch(`https://api.comabooks.org/answers/my/${templateId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }).then((res) => res.json()),
          ]);

          const filteredAnswers = answersResponse.filter(
            (answer: any) =>
              answer.answer !== "-" && answer.answer.trim() !== ""
          );

          const questionsWithAnswers = questionsResponse
            .map((question: any, index: number) => {
              const answer = filteredAnswers.find(
                (ans: any) => ans.questionId === question._id
              );
              return answer
                ? { number: index + 1, question: question.question }
                : null;
            })
            .filter((question: any) => question !== null);

          setQuestions(questionsWithAnswers);
        } catch (error) {
          console.error("Error fetching questions and answers:", error);
        }
      };

      fetchQuestionsAndAnswers();
    }
  }, [templateId]);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoDate(new Date(e.target.value));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    if (description.length <= 200) {
      setPhotoDescription(description);
    }
  };

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      console.log(`Fetching details for photoId: ${photoId}`);
      if (templateId && photoId) {
        try {
          const photos = await PhotoService.photoControllerGetPhotos(
            { templateId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const photoDetails = photos.find((photo) => photo._id === photoId);
          console.log(photoDetails);
          if (photoDetails) {
            setPhotoDate(new Date(photoDetails.date));
            setPhotoDescription(photoDetails.description);
            setPhotoFile(photoDetails.photoUrl);
            setHideDate(photoDetails.hideDate);
            setHideDescription(photoDetails.hideDescription);
            setQuestionTxt(photoDetails.questionTxt);
            setPhotoPosition(photoDetails.status || "center");
            setIsEditable(false);
          }
        } catch (error) {
          console.error("Failed to fetch photo details:", error);
        }
      }
    };

    fetchPhotoDetails();
  }, [photoId, templateId]);

  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedFormats = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/heic",
      ];

      if (!allowedFormats.includes(file.type)) {
        alert("Available image formats: PNG, JPEG, JPG, HEIC");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadedFile = await axios.post(
          "https://api.comabooks.org/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setPhotoFile(uploadedFile.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const photos = useSelector<RootState, PhotoEnityDto[]>((state) =>
    Object.values(state.photos.photos)
  );

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // If we are not in edit mode, just toggle to edit mode without validating
    if (!isEditable) {
      setIsEditable(true);
      return;
    }

    // If in edit mode, validate the fields before saving
    if (
      photoDate &&
      photoDescription &&
      photoFile &&
      templateId &&
      questionTxt
    ) {
      const photoData = {
        date: photoDate,
        description: photoDescription,
        photoUrl: photoFile,
        templateId: templateId,
        hideDate: hideDate,
        hideDescription: hideDescription,
        questionTxt: questionTxt,
        status: photoPosition,
      };

      if (photoId) {
        dispatch(updatePhoto({ ...photoData, photoId, userId: "" }));
      } else {
        if (photos.length > 100) return;
        dispatch(addPhoto(photoData));
      }
      // After saving, toggle to non-editable (view) mode
      setIsEditable(false);
    } else {
      setNotify(true);
      setTimeout(() => {
        setNotify(false);
      }, 2000);
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (photoId) {
      try {
        await dispatch(deletePhoto(photoId));
        navigate("/forms");
      } catch (error) {
        console.error("Failed to delete photo:", error);
      }
    }
  };

  function parseDate(dateString: string) {
    console.log(dateString);

    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const parts = dateString.split(" ");
    console.log(parts);

    const day = parts[2];
    const monthName = parts[1];
    const year = parts[3];

    const month = months[monthName as keyof typeof months];

    return `${day}.${month}.${year}`;
  }

  const formattedDate = parseDate(photoDate ? photoDate.toString() : " ");
  console.log(isEditable);

  return (
    <>
      <div className="add-photo-container">
        {notify && (
          <div className="notify-popup">
            <div className="notify-popup-content">
              To save, fill in all fields!
            </div>
          </div>
        )}
        <form className="add-photo-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group-photo">
            <label htmlFor="photoFile">Image</label>
            <input
              type="file"
              id="photoFile"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={!isEditable}
              style={{ display: "none" }}
            />
            <label
              htmlFor="photoFile"
              className="upload-icon-label"
              style={{ backgroundColor: isEditable ? "white" : "#DDDDDD" }}
            >
              <img src={uploadicon} alt="Upload" className="upload-icon" />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="photoDate">Date</label>
            <input
              type="date"
              id="photoDate"
              value={photoDate?.toISOString().substring(0, 10)}
              onChange={handleDateChange}
              disabled={!isEditable}
              style={{ backgroundColor: isEditable ? "white" : "#DDDDDD" }}
            />
          </div>
          <div className="hidephoto">
            <label>
              <input
                type="checkbox"
                checked={hideDate}
                onChange={() => setHideDate(!hideDate)}
                disabled={!isEditable}
              />
              Hide date
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="photoDescription">Description</label>
            <textarea
              ref={textareaRef}
              id="photoDescription"
              value={photoDescription}
              onChange={handleDescriptionChange}
              disabled={!isEditable}
              style={{ backgroundColor: isEditable ? "white" : "#DDDDDD" }}
            />
          </div>
          <div className="hidephoto">
            <label>
              <input
                type="checkbox"
                checked={hideDescription}
                onChange={() => setHideDescription(!hideDescription)}
                disabled={!isEditable}
              />
              Hide description
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="questionTxt">
              Which question should the image go after?
            </label>
            <select
              id="questionTxt"
              value={questionTxt || ""}
              onChange={(e) => setQuestionTxt(e.target.value)}
              disabled={!isEditable}
            >
              <option value="">Select question</option>
              {questions.map((pair, idx) => (
                <option key={idx} value={pair.question}>
                  {pair.number}. {pair.question}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="photo-positions-label">
              Формат полноэкранно
            </div>

          <div className="photo-positions">
            <button
              disabled={!isEditable}
              style={{
                backgroundColor: isEditable
                  ? photoPosition === "center"
                    ? "#c3d3f9"
                    : "transparent"
                  : "#DDDDDD",
              }}
              onClick={() => {
                setPhotoPosition("center");
              }}
            >
              По центру
            </button>
            <button
              disabled={!isEditable}
              style={{
                backgroundColor: isEditable
                  ? photoPosition === "bottom"
                    ? "#c3d3f9"
                    : "transparent"
                  : "#DDDDDD",
              }}
              onClick={() => {
                setPhotoPosition("bottom");
              }}
            >
              Снизу
            </button>
            <button
              disabled={!isEditable}
              style={{
                backgroundColor: isEditable
                  ? photoPosition === "top"
                    ? "#c3d3f9"
                    : "transparent"
                  : "#DDDDDD",
              }}
              onClick={() => {
                setPhotoPosition("top");
              }}
            >
              Сверху
            </button>
            
          </div> */}


          <div className="photo-positions-label">
              Frame formats
            </div>
          <div className="photo-positions">
          <button
              disabled={!isEditable}
              style={{
                backgroundColor: isEditable
                  ? photoPosition === "vertical"
                    ? "#c3d3f9"
                    : "transparent"
                  : "#DDDDDD",
              }}
              onClick={() => {
                setPhotoPosition("vertical");
              }}
            >
              Vertical
            </button>
            <button
              disabled={!isEditable}
              style={{
                backgroundColor: isEditable
                  ? photoPosition === "square"
                    ? "#c3d3f9"
                    : "transparent"
                  : "#DDDDDD",
              }}
              onClick={() => {
                setPhotoPosition("square");
              }}
            >
              Square
            </button>
            <button
              disabled={!isEditable}
              style={{
                backgroundColor: isEditable
                  ? photoPosition === "horizontal"
                    ? "#c3d3f9"
                    : "transparent"
                  : "#DDDDDD",
              }}
              onClick={() => {
                setPhotoPosition("horizontal");
              }}
            >
              Horizontal
            </button>
            </div>



          <div className="add-photo-buttons">
            <button
              className="input-save-button-add"
              type="button"
              onClick={handleSave}
            >
              {isEditable ? "Save" : "Edit"}
            </button>
            <button
              className="input-save-button-add"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>

        <div className="photo-preview-container">
          <div className={`photo-preview ${photoPosition}`}>
            {photoFile && (
              <img
                className={`photo-preview-media ${photoPosition}`}
                src={photoFile}
                alt="Preview"
                style={{
                  filter:
                    ["top", "center", "bottom"].includes(photoPosition) &&
                    (!hideDate || !hideDescription)
                      ? "brightness(60%)"
                      : undefined,
                }}
              />
            )}
            {["vertical", "square", "horizontal"].includes(photoPosition) && (
              <img
                src={
                  photoPosition === "vertical"
                    ? vertical
                    : photoPosition === "square"
                    ? square
                    : horizontal
                }
                alt={`${photoPosition} asset`}
                className="photo-preview-asset"
              />
            )}

            <div className={`photo-preview-details ${photoPosition}`}>
              {photoDate && !hideDate && (
                <div className={`photo-preview-date ${photoPosition}`}>
                  {formattedDate}
                </div>
              )}
              {photoDescription && !hideDescription && (
                <div className={`photo-preview-description ${photoPosition}`}>
                  {photoDescription}
                </div>
              )}
            </div>
            <div className={`preview-photo-colon ${photoPosition}`}>
              <p>{coverData?.bookName || "\u00A0"}</p>
              <p>95</p>
            </div>
          </div>
        </div>
      </div>

      <Link to={`/forms/${templateId}`}>
        <ArrowBackIosNewIcon className="arrow-icon" />
      </Link>
    </>
  );
};

export default AddPhoto;
