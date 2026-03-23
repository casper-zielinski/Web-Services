import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const useDate = (date: Date | null) : string => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};

export default useDate;
