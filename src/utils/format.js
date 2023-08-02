// https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators

export const format = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}