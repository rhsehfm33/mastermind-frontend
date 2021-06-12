import { auth, board, list, card } from "../api";

const actions = {
  LOGIN({ commit }, { email, password }) {
    return auth
      .login(email, password)
      .then(({ accessToken }) => commit("LOGIN", { accessToken }));
  },
  // 이메일 중복 체크
  CHECK_EMAIL({ commit }, { email }) {
    return auth.check_email(email);
  },
  // 회원 가입
  REGISTER({ commit }, { name, email, password }) {
    return auth.register(name, email, password);
  },
  FETCH_BOARD_LIST({ commit }) {
    return board.fetch().then(data => commit("SET_BOARD_LIST", data));
  },
  FETCH_BOARD({ commit }, id) {
    return board.fetch(id).then(data => commit("SET_BOARD", data));
  },
  ADD_BOARD(_, title) {
    return board.create(title).then(({ item }) => item.id);
  },
  // 보드 색상 변경 액션 함수
  UPDATE_BOARD({ state, dispatch }, { id, title, bgColor }) {
    return board
      .update(id, { title, bgColor })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  DELETE_BOARD(_, id) {
    return board.destroy(id);
  },

  ADD_LIST({ state, dispatch }, { title, boardId, pos }) {
    return list
      .create({ title, pos, boardId })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  UPDATE_LIST({ state, dispatch }, { id, pos, title }) {
    return list
      .update(id, { pos, title })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  DELETE_LIST({ state, dispatch }, { id, pos, title }) {
    return list
      .destroy(id, { pos, title })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },

  FETCH_CARD({ commit }, id) {
    return card.fetch(id).then(({ item }) => commit("SET_CARD", item));
  },
  ADD_CARD({ state, dispatch }, { title, pos, listId }) {
    return card
      .create({ title, pos, listId })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  UPDATE_CARD({ state, dispatch }, { id, pos, title, description, listId }) {
    return card
      .update(id, { pos, title, description, listId })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  DELETE_CARD({ state, dispatch }, id) {
    return card.destroy(id).then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
};

export default actions;
