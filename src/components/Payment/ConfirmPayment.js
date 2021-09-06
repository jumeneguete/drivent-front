import { useLocation } from "react-router-dom";
import BookSummary from "./BookSummary";

export default function ConfirmPayment(props) {
  const bookInfo = useLocation().state.bookInfo;
  
  return (
    <BookSummary 
      bookInfo={{
        ticket: bookInfo.ticketOption.type, 
        hotel: bookInfo.hotelOption.name,
        price: bookInfo.ticketOption.price + bookInfo.hotelOption.price
      }}/>
  );
}
