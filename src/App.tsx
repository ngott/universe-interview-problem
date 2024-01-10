import { useState } from "react";
import "./App.css";
import Feed from "./Feed";
import { Organization } from "./util";

function App() {
  const navOptions = [
    {
      orgKey: "ALL",
      orgValue: Organization.ALL,
      image:
        "https://media.istockphoto.com/id/124946816/vector/retro-graphic-of-a-clenched-fist.jpg?s=612x612&w=0&k=20&c=ufonxnMXXK4F--K6Oja8-hylwHVaZ1PG19v4RRdq_c0=",
    },
    {
      orgKey: "IDNM",
      orgValue: Organization.IDNM,
      image:
        "https://img.huffingtonpost.com/asset/5cd4d2672500002f00a05bab.jpeg?ops=scalefit_630_400_noupscale&format=webp",
    },
    {
      orgKey: "SM",
      orgValue: Organization.SM,
      image:
        "https://cms-assets.berniesanders.com/media/images/sunrise-movement.original.png",
    },
    {
      orgKey: "XR",
      orgValue: Organization.XR,
      image:
        "https://static.dezeen.com/uploads/2019/06/extinction-rebellion-boycott-design-museum-news-sq_c.jpg",
    },
    {
      orgKey: "JVP",
      orgValue: Organization.JVP,
      image:
        "https://www.jewishvoiceforpeace.org/wp-content/uploads/2023/04/logo_acronym-small.png",
    },
    {
      orgKey: "APTP",
      orgValue: Organization.APTP,
      image:
        "https://images.squarespace-cdn.com/content/v1/55de3d9fe4b00eccbe4dcd5f/1690409278532-1VEXXNAUFSB56RVE69NY/APTP+Logo-Small+Red.jpg?format=1000w",
    },
  ];

  const [org, setOrg] = useState("ALL");

  return (
    <div className="body-container">
      <nav className="nav">
        <div className="nav-container">
          {navOptions.map((option) => (
            <div className="nav-box" onClick={() => setOrg(option.orgKey)}>
              <img
                className="profile-img"
                width={40}
                height={40}
                src={option.image}
              />
              <div className="nav-button">{option.orgValue}</div>
            </div>
          ))}
        </div>
      </nav>
      <Feed organization={org} />
    </div>
  );
}

export default App;
