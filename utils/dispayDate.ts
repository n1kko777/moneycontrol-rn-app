import moment from 'moment';

export const displayDate = (date: string) => moment(date).format('DD.MM.YYYY');
