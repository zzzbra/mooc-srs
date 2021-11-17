import baseApi from './baseApi';
import { CARD_TAG_TYPE, LESSON_TAG_TYPE } from 'tagTypes';
import { Card } from 'models';

interface GetCardsArgs {
  lessonId: string;
}

interface GetCardArgs {
  cardId: string;
  // lessonId: string;
}

interface AddNewCardArgs {
  cardId: string;
  lessonId: string;
  front: string;
  back?: string;
  isCardReviewable?: boolean;
}

export const defaultNewCardArgs = {
  cardId: '',
  lessonId: '',
  front: '',
  isCardReviewable: false,
};

interface UpdateCardArgs {
  cardId: string;
  lessonId: string;
  front: string;
  back?: string;
  isCardReviewable?: boolean;
}

export interface DeleteCardArgs {
  cardId: string;
  // lessonId: string;
}

const cardsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<Card[], GetCardsArgs>({
      query: (data) => {
        return {
          url: `v1/cards?lessonId=${data.lessonId}`,
          method: 'get',
        };
      },
      providesTags: [CARD_TAG_TYPE, LESSON_TAG_TYPE],
    }),
    getCard: build.query<Card, GetCardArgs>({
      query: ({ cardId }) => {
        return {
          url: `v1/cards/${cardId}`,
          method: 'get',
        };
      },
      providesTags: [CARD_TAG_TYPE],
    }),
    addNewCard: build.mutation<Card, AddNewCardArgs>({
      query: (data) => ({
        url: 'v1/cards',
        method: 'post',
        data,
      }),
      invalidatesTags: [CARD_TAG_TYPE, LESSON_TAG_TYPE],
    }),
    updateCard: build.mutation<Card, UpdateCardArgs>({
      query: ({
        cardId,
        lessonId,
        front,
        back,
        isCardReviewable,
      }: UpdateCardArgs = defaultNewCardArgs) => ({
        url: `v1/cards/${cardId}`,
        method: 'put',
        data: { front, lessonId, back, isCardReviewable },
      }),
      invalidatesTags: [CARD_TAG_TYPE],
    }),
    deleteCard: build.mutation<Card[], DeleteCardArgs>({
      query: ({ cardId }) => ({
        url: `v1/cards/${cardId}`,
        method: 'delete',
      }),
      invalidatesTags: [CARD_TAG_TYPE],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetCardQuery,
  useAddNewCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = cardsApi;
