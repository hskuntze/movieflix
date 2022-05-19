import { Review } from "types/review";
import { ReactComponent as StarImg } from "assets/images/image 3.svg";
import './styles.css';

type Props = {
  review: Review;
};

const ReviewCard = ({ review }: Props) => {
  return (
    <div className="review-card-container">
      <div className="review-body">
        <div className="review-header">
          <StarImg />
          <h5>{review.user.name}</h5>
        </div>
        <div className="review-text">
          <p>{review.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
