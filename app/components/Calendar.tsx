import React from 'react';
import { Calendar } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DatePickerProps {
  value: Date,
  onChange: (value: Date) => void;
  disabledDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates
}) => {
  return (
    <Calendar
      color="#262626"
      date={value}
      onChange={(date) => onChange(date)}
      //minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default DatePicker;
