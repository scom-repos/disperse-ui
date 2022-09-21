import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

Styles.cssRule('.disperse-component', {
  $nest: {
    'i-hstack.disabled': {
      opacity: '0.5',
    },
    '.link-icon > svg': {
      width: '20px',
    },
    '.text-overflow': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '#tokenElm': {
      cursor: 'pointer',
      borderColor: '#9C9C9C',
    },
    '#tokenElm.disabled': {
      cursor: 'default',
      borderColor: Theme.colors.primary.main,
    },
    '.csv-button': {
      background: '#34343A',
      height: 45,
      width: 170,
      cursor: 'pointer',
      $nest: {
        '*': {
          fontSize: 18,
          fontFamily: 'Montserrat',
          fontWeight: 'bold',
        },
        '&:hover': {
          background: '#505050 !important',
        },
        '&.disabled': {
          cursor: 'default',
          background: 'linear-gradient(270deg, #7B7B7B 0%, #929292 100%)',
          opacity: 0.9,
        },
      },
    },
    '.input-batch': {
      $nest: {
        'textarea': {
          background: '#34343A',
          color: '#fff',
          padding: '0.5rem 0.75rem',
          borderRadius: '10px',
          border: 'none',
          height: '170px !important',
          resize: 'none',
          outline: 'none',
          $nest: {
            '&::placeholder': {
              color: '#fff',
              opacity: 0.8
            },
            '&:focus::placeholder': {
              opacity: 0
            },
          },
        },
      },
    },
    '.overflow-auto': {
      overflow: 'auto',
    },
    '.custom-scroll': {
      $nest: {
        '::-webkit-scrollbar-track': {
          background: '#FFB82F',
        },
        '::-webkit-scrollbar': {
          width: '5px',
        },
        '::-webkit-scrollbar-thumb': {
          background: Theme.colors.secondary.main,
          borderRadius: '5px',
        },
      },
    },
    '.bg-modal': {
      $nest: {
        '.modal': {
          background: Theme.background.modal,
          width: 420,
          maxWidth: '100%',
          padding: '0.75rem 1rem',
          borderRadius: '1rem',
          color: Theme.text.primary
        },
      }
    },
    '@media screen and (max-width: 1200px)': {
      $nest: {
        '.ml-auto': {
          marginLeft: 'auto',
        },
        '.step-elm': {
          flexWrap: 'wrap',
          gap: '10px',
          padding: '15px 10px !important',
        },
        '.step-2': {
          width: '100% !important',
          marginRight: '0 !important',
        },
        '#tokenElm': {
          padding: '15px 10px !important',
        },
        '#containerUserInfo > i-vstack': {
          gap: '8px !important'
        },
        '#thirdStepElm > i-hstack': {
          flexWrap: 'wrap',
        },
        '#fourthStepElm > i-vstack': {
          maxWidth: '100%',
          width: '100% !important',
          flexWrap: 'wrap',
          $nest: {
            '&> i-hstack': {
              flexWrap: 'wrap',
              width: '100%',
            },
            '.custom-scroll': {
              overflow: 'auto',
              $nest: {
                '&::-webkit-scrollbar-track': {
                  background: '#FFB82F',
                },
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: Theme.colors.secondary.main,
                  borderRadius: '3px',
                }
              }
            },
            '.address-elm': {
              minWidth: '650px',
            },
            '.step-4': {
              height: 'auto !important',
              width: 'calc(100% - 1px) !important',
              padding: '20px !important',
            }
          }
        }
      }
    }
  },
});
