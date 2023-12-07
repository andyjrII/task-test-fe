const sampleList = [
  {
    key: 1,
    text: "Fictional Characters",
    value: "Fictional Characters",
    children: [
      { key: 1, text: "Joker", value: "Joker" },
      { key: 2, text: "Batman", value: "Batman" },
      { key: 3, text: "Robin", value: "Robin" },
      { key: 4, text: "Two-Face", value: "Two-Face" },
      {
        key: 5,
        text: "Not a Superhero",
        value: "Not a Superhero",
        children: [
          { key: 1, text: "Koolaid Man", value: "Koolaid Man" },
          { key: 1, text: "Koolaid Woman", value: "Koolaid Woman" },
          { key: 1, text: "Koolaid Woman Twin", value: "Koolaid Woman Twin" },
          { key: 2, text: "Joe Dirt", value: "Joe Dirt" },
          {
            key: 1,
            text: "Fictional Characters",
            value: "Fictional Characters",
            children: [
              { key: 1, text: "Joker", value: "Joker" },
              { key: 2, text: "Batman", value: "Batman" },
              { key: 3, text: "Robin", value: "Robin" },
              { key: 4, text: "Two-Face", value: "Two-Face" }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    text: "Real People",
    value: "Real People",
    children: [
      { key: 2, text: "Jenn", value: "Jenn" },
      { key: 3, text: "Will", value: "Will" },
      { key: 3, text: "Chris", value: "Chris" },
      { key: 3, text: "Bradley", value: "Bradley" },
      { key: 3, text: "Ben", value: "Ben" },
      { key: 3, text: "Min", value: "Min" },
      { key: 3, text: "Luke", value: "Luke" }
    ]
  }
];
