const initialState = {
  allAdverts: [],
  advertsCount: 0
};

export default function eventReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case "CREATE_NEW_ADVERT": {
      return {
        ...state,
        lastAddedAdvert: action.advert,
        allAdverts: [...state.allAdverts, action.advert],
        advertsCount: state.advertsCount + 1
      };
    }
    case "FETCH_ALL_ADVERTS": {
      const { data, count } = action.adverts.data;
      if (state.allAdverts) {
        const modifiedAdverts = data.map(advert => {
          if (advert.advertImages.length !== 0) {
            return {
              ...advert,
              image: advert.advertImages[0].image.url
            };
          }
          return advert;
        });

        return {
          ...state,
          allAdverts: [...state.allAdverts, ...modifiedAdverts],
          advertsCount: count
        };
      }
      return {
        ...state,
        allAdverts: data,
        advertsCount: count
      };
    }
    case "FETCH_SEARCHED_ADVERTS": {
      const { data, count } = action.adverts.data;
      if (state.searchedAdverts) {
        const modifiedAdverts = data.map(advert => {
          if (advert.advertImages.length !== 0) {
            return {
              ...advert,
              image: advert.advertImages[0].image.url
            };
          }
          return advert;
        });

        return {
          ...state,
          searchedAdverts: [...state.searchedAdverts, ...modifiedAdverts],
          advertsCount: count
        };
      }
      return {
        ...state,
        searchedAdverts: data,
        advertsCount: count
      };
    }
    case "FETCH_ONE_ADVERT": {
      return {
        ...state,
        selectedAdvert: action.advert
      };
    }
    case "GET_AGENCY_AGENTS": {
      const agencyAgents = action.agency.users.filter(
        agent => agent.role === "agencyAgent"
      );
      return {
        ...state,
        agencyAgents
      };
    }
    case "CLEAR_SEARCHED_ADVERTS": {
      return {
        ...state,
        searchedAdverts: [],
        advertsCount: 0,
        allAdverts: []
      };
    }
    case "TOGGLE_AGENT_CONFIRMATION": {
      const agencyAgents = state.agencyAgents.map(agent => {
        if (agent.id === action.agent.id) {
          return { ...action.agent };
        }
        return agent;
      });

      return {
        ...state,
        agencyAgents
      };
    }
    case "GET_MY_ADVERTS": {
      return {
        ...state,
        myAdverts: [...action.adverts],
        myAdvertIds: [...action.adverts.map(advert => advert.id)]
      };
    }
    case "APPOINTMENT_WAS_EDITED": {
      if (state.myAdverts) {
        const editedAppointments = state.myAdverts.map(advert => {
          return {
            ...advert,
            advertAppointments: advert.advertAppointments.map(addApp => {
              if (addApp.appointmentId === action.appointment.id) {
                return {
                  ...addApp,
                  appointment: action.appointment
                };
              }
              return addApp;
            })
          };
        });
        return {
          ...state,
          myAdverts: editedAppointments
        };
      }
      return {
        ...state
      };
    }
    case "CANCEL_APPOINTMENT": {
      if (state.myAdverts) {
        const editedAppointments = state.myAdverts.map(advert => {
          return {
            ...advert,
            advertAppointments: advert.advertAppointments.map(addApp => {
              if (addApp.appointmentId === action.appointment.id) {
                return {
                  ...addApp,
                  appointment: action.appointment
                };
              }
              return addApp;
            })
          };
        });
        return {
          ...state,
          myAdverts: editedAppointments
        };
      }
      return {
        ...state
      };
    }
    case "ADD_NEW_IMAGE": {
      return {
        ...state,
        selectedAdvert: {
          ...state.selectedAdvert,
          advertImages: [
            ...state.selectedAdvert.advertImages,
            { image: { ...action.image }, imageId: action.image.id }
          ]
        }
      };
    }
    case "DELETE_ONE_IMAGE": {
      const advertImages = state.selectedAdvert.advertImages.filter(
        image => image.imageId !== action.image.id
      );
      return {
        ...state,
        selectedAdvert: {
          ...state.selectedAdvert,
          advertImages
        }
      };
    }
    case "ONE_EXTRA_ADDED": {
      return {
        ...state,
        selectedAdvert: {
          ...state.selectedAdvert,
          advertExtras: [
            ...state.selectedAdvert.advertExtras,
            { extraId: action.extra.id, extra: action.extra }
          ]
        }
      };
    }
    case "ONE_EXTRA_REMOVED": {
      const advertExtras = state.selectedAdvert.advertExtras.filter(
        advertCon => advertCon.extraId !== action.extra.id
      );
      return {
        ...state,
        selectedAdvert: {
          ...state.selectedAdvert,
          advertExtras
        }
      };
    }
    case "LOG_OUT_USER": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
