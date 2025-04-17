$('#countdown-container').ClassyCountdown({
    theme: "white", 
    
    // end time
    now: $.now(), 
    end: $.now() + 28988645600,

    
    // whether to display the days/hours/minutes/seconds labels.
    labels: true,
    
    // object that specifies different language phrases for says/hours/minutes/seconds as well as specific CSS styles.
    labelsOptions: {
      lang: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds'
      },
      style: 'font-size: 16px;'
    },
    
    // custom style for the countdown
    style: {
      element: '',
      labels: false,
      days: {
        gauge: {
          thickness: 0.07,
          bgColor: 'rgba(127, 77, 79, 0.2)',
          fgColor: 'rgba(127, 77, 79, 1)',
          lineCap: 'butt'
        },
        textCSS: ''
      },
      hours: {
        gauge: {
          thickness: 0.07,
          bgColor: 'rgba(127, 77, 79, 0.2)',
          fgColor: 'rgba(127, 77, 79, 1)',
          lineCap: 'butt'
        },
        textCSS: ''
      },
      minutes: {
        gauge: {
          thickness: 0.07,
          bgColor: 'rgba(127, 77, 79, 0.2)',
          fgColor: 'rgba(127, 77, 79, 1)',
          lineCap: 'butt'
        },
        textCSS: ''
      },
      seconds: {
        gauge: {
          thickness: 0.07,
          bgColor: 'rgba(127, 77, 79, 0.2)',
          fgColor: 'rgba(127, 77, 79, 1)',
          lineCap: 'butt'
        },
        textCSS: ''
      }
    },
    
    // callback that is fired when the countdown reaches 0.
    onEndCallback: function() {}
    
  });