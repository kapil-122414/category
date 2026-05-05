 import React from 'react';
 import Cards from './components/cards';
 import Button from './components/button/button'
 import Header from './components/header/header';
 const App = () => {
//   const jobs = [
//   {
//     id: 1,
//     companyName: "Google",
//     brandLogo: "data:image/png;base64,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",
//     jobTitle: "Frontend Developer",
//     postDate: "2026-05-01",
//     tags: ["React", "JavaScript"],
//     pay: "₹25 LPA",
//     location: "Bangalore"
//   },
//   {
//     id: 2,
//     companyName: "Microsoft",
//     brandLogo: "https://logo.clearbit.com/microsoft.com",
//     jobTitle: "Backend Developer",
//     postDate: "2026-05-02",
//     tags: ["Node.js", "MongoDB"],
//     pay: "₹28 LPA",
//     location: "Hyderabad"
//   },
//   {
//     id: 3,
//     companyName: "Amazon",
//     brandLogo: "https://logo.clearbit.com/amazon.com",
//     jobTitle: "Full Stack Developer",
//     postDate: "2026-05-03",
//     tags: ["React", "Node.js"],
//     pay: "₹30 LPA",
//     location: "Pune"
//   },
//   {
//     id: 4,
//     companyName: "Flipkart",
//     brandLogo: "https://logo.clearbit.com/flipkart.com",
//     jobTitle: "UI Developer",
//     postDate: "2026-05-01",
//     tags: ["HTML", "CSS"],
//     pay: "₹12 LPA",
//     location: "Bangalore"
//   },
//   {
//     id: 5,
//     companyName: "Zomato",
//     brandLogo: "https://logo.clearbit.com/zomato.com",
//     jobTitle: "React Developer",
//     postDate: "2026-05-04",
//     tags: ["React", "Redux"],
//     pay: "₹15 LPA",
//     location: "Delhi"
//   },
//   {
//     id: 6,
//     companyName: "Swiggy",
//     brandLogo: "https://logo.clearbit.com/swiggy.com",
//     jobTitle: "Frontend Engineer",
//     postDate: "2026-05-02",
//     tags: ["JavaScript", "Tailwind"],
//     pay: "₹14 LPA",
//     location: "Bangalore"
//   },
//   {
//     id: 7,
//     companyName: "Infosys",
//     brandLogo: "https://logo.clearbit.com/infosys.com",
//     jobTitle: "Software Engineer",
//     postDate: "2026-05-01",
//     tags: ["Java", "Spring"],
//     pay: "₹8 LPA",
//     location: "Chennai"
//   },
//   {
//     id: 8,
//     companyName: "TCS",
//     brandLogo: "https://logo.clearbit.com/tcs.com",
//     jobTitle: "Backend Engineer",
//     postDate: "2026-05-03",
//     tags: ["Node.js", "SQL"],
//     pay: "₹7 LPA",
//     location: "Mumbai"
//   },
//   {
//     id: 9,
//     companyName: "Paytm",
//     brandLogo: "https://logo.clearbit.com/paytm.com",
//     jobTitle: "Full Stack Developer",
//     postDate: "2026-05-04",
//     tags: ["React", "Express"],
//     pay: "₹16 LPA",
//     location: "Noida"
//   },
//   {
//     id: 10,
//     companyName: "Adobe",
//     brandLogo: "https://logo.clearbit.com/adobe.com",
//     jobTitle: "Frontend Developer",
//     postDate: "2026-05-05",
//     tags: ["Vue", "JavaScript"],
//     pay: "₹22 LPA",
//     location: "Noida"
//   }
// ];


   return (
    //  <div className='alldiv'>
    //   {
    //   jobs.map(function(item){
       
    //        return <Cards company={item.companyName} jobTitle={item.jobTitle} location={item.location} pay={item.pay} brandLogo={item.brandLogo} />
    //     })
    //   }
    //  </div>
    <div>
      <Button/>
    <Header/>
    </div>
    
   )
 }
 
 export default App
 