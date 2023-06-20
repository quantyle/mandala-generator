import axios from "axios";

const apiHost = "http://0.0.0.0:8000/";

// axios.defaults.withCredentials = true;

class API {

  // Create a user
  static getMandala(params) {
    return axios({
      method: "get",
      headers: {"Content-Type": "application/json" },
      responseType: 'arraybuffer',
      url: apiHost + "image",
      params: params,
    });
  }

  // Create a loan
  static createLoan(userId, loanId, amount, annualInterestRate, loanTerm) {
    return axios({
      method: "post",
      url: apiHost + "loans",
      data: {
        user_id: userId,
        loan_id: loanId,
        amount: amount,
        annual_interest_rate: annualInterestRate,
        loan_term: loanTerm,
      },
    });
  }
}

export default API
