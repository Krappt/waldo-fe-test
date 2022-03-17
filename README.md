## Getting Started

Clone the repository

```bash
git clone https://github.com/Krappt/waldo-fe-test.git
```

Install dependencies

```bash
yarn install
```

Run the project

```bash
yarn start
```

Build the production

```bash
yarn build
```

Your browser should open in http://localhost:3000/

## Problem Statement :pizza:
We have a TON of :pizza: and a GraphQL API but no way for pizza lovers to actually order their 'za! Your goal is to design a pizza order form using React. Pizza lovers need to be able to add pizzas to a "Pizza Cart" (i.e. a list of pizzas they've submitted) and be able to view all the pies they've submitted to their "Pizza Cart"!

## Requirements
Don't worry about appearance, focus more on functionality!
- You can query ALL pizza data from https://core-graphql.dev.waldo.photos/pizza. This should happen at runtime from the client (Pizza pricing can be quite volatile). Opening the above URL directly on your browser will reveal a GraphiQL interface. Through the interface and its Documentation Explorer (hit the top right button labeled "Docs")" you can find:
    - Pizza sizes + base prices.
    - Toppings + prices.
    - Available toppings per pizza size, and whether they are selected by default for that size.
- The user should be able to add/remove pizzas of any size to their cart.
- Use checkboxes to disable/enable toppings when adding a new pizza. The pizza size determines the max number of toppings that can be toggled. Disable other topping checkboxes once they hit the max for a pizza. (A `maxToppings` of `null` means unlimited toppings!)
- Cost per pizza should be calculated and displayed based on pizza base costs + sum of selected toppings.
- Total cost should be calculated and displayed for all pizzas in the cart.

## Deliverables
A github or bitbucket repository with your source code. If you don't host your project somewhere publicly accessible, be sure to include ample instructions on how to install and run your app locally.

### Be Prepared to:
- Present your solution to a group of smart engineers like yourself.
- Talk about the decisions that went into the creation of your solution.
- Explain how you see the solution evolving over time.
- Discuss the runtime characteristics of the system.

#### Tips
- You can use any state/data library you want (we use Apollo Client & Redux at Waldo but we have no hard expectations for this test). If you feel you don't need a library and use vanilla React (e.g. state, context) that's also perfectly fine!
- Don't spend more than a few hours on the project. We are looking for a strong understanding of the key concepts of implementing a React app, not a perfect implementation.
- The main areas we will be evaluating are app/form state management, data querying, and robustness around an evolving data model (e.g. new pizzas or toppings shouldn't break your app).

*Pie disclaimer*: Feel free to polish your app as much as you want but in an effort to keep it fair for everyone a few things will not be taken into consideration in the evaluation process:
- Styling or any kind of bells and whistles.
- Tests (although we heavily test our code at Waldo and it's something we expect you to do once part of the team it's not necessary for this test).
- Custom frameworks / fancy bundler setups - Feel free to use your own but don't feel you need to create something just for this, CRA will do just fine.

No hard deadlines and no pressure.

#### Reading
- https://graphql.github.io/learn
- https://cooking.nytimes.com/guides/1-how-to-make-pizza