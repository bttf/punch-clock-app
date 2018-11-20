import styled from 'styled-components';
export default styled.div`
   padding-top: 40px;
   text-align: center;

  #lcd-clock {
    height: auto;
    width: 100%;
    margin: 0 auto;
  }

  /* svg specific css */
  .lcd-element {
    fill: #FFFFFF;
    transition: all 0.2s ease-out
  }
  .lcd-element-active {
    fill: #FA4031;
  }


  /*
  all number-is-* classes are applied alongside .digit
  eg <g class="hour digit digit-1 number-is-3">
  */

  /* 1 */
  .number-is-1 .top-right,
  .number-is-1 .bottom-right,
  /* 2 */
  .number-is-2 .top-center,
  .number-is-2 .top-right,
  .number-is-2 .mid-center,
  .number-is-2 .bottom-left,
  .number-is-2 .bottom-center,
  /* 3 */
  .number-is-3 .top-center,
  .number-is-3 .top-right,
  .number-is-3 .mid-center,
  .number-is-3 .bottom-right,
  .number-is-3 .bottom-center,
  /* 4 */
  .number-is-4 .top-left,
  .number-is-4 .top-right,
  .number-is-4 .mid-center,
  .number-is-4 .bottom-right,
  /* 5 */
  .number-is-5 .top-center,
  .number-is-5 .top-left,
  .number-is-5 .mid-center,
  .number-is-5 .bottom-right,
  .number-is-5 .bottom-center,
  /* 6 */
  .number-is-6 .top-center,
  .number-is-6 .top-left,
  .number-is-6 .mid-center,
  .number-is-6 .bottom-right,
  .number-is-6 .bottom-left,
  .number-is-6 .bottom-center,
  /* 7 */
  .number-is-7 .top-center,
  .number-is-7 .top-right,
  .number-is-7 .bottom-right,
  /* 8 */
  .number-is-8 .top-center,
  .number-is-8 .top-left,
  .number-is-8 .top-right,
  .number-is-8 .mid-center,
  .number-is-8 .bottom-right,
  .number-is-8 .bottom-left,
  .number-is-8 .bottom-center,
  /* 9 */
  .number-is-9 .top-center,
  .number-is-9 .top-left,
  .number-is-9 .top-right,
  .number-is-9 .mid-center,
  .number-is-9 .bottom-right,
  .number-is-9 .bottom-center,
  /* 0 */
  .number-is-0 .top-center,
  .number-is-0 .top-left,
  .number-is-0 .top-right,
  .number-is-0 .bottom-right,
  .number-is-0 .bottom-left,
  .number-is-0 .bottom-center
  {
    fill: #FA4031;
  }
`;
