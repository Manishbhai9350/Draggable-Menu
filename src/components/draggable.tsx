import gsap from "gsap";
import _Draggable from "gsap/Draggable";
import { Menu, X } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";

const Draggable = () => {
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const containerInitialRect = useRef();
  const snappingRadius = 200;
  const distanceFromInitialPos = useRef(0);
  const dottedContainer = useRef(null);
  const itemsWidth = useRef(0);
  const closeMenu = () => {
    const items = gsap.utils.toArray(".item");
    if (!items.length) return;
    gsap.to(".icon-x", {
      opacity: 0,
    });
    gsap.to(".icon-menu", {
      delay: 0.5,
      opacity: 1,
    });
    gsap.to(".items", {
      pointerEvents: "none",
      width: 0,
      delay: 0.2,
      padding: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(document.querySelector(".dotted-container"), {
      width: containerInitialRect.current.width - itemsWidth.current,
    });
    items.map((item, i) => {
      const tl = gsap.timeline();
      tl.to(item, {
        delay: -i * 0.1,
        opacity: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    });
  };
  const openMenu = () => {
    const items = gsap.utils.toArray(".item");
    if (!items.length) return;
    gsap.to(".icon-menu", {
      opacity: 0,
    });
    gsap.to(".icon-x", {
      delay: 0.5,
      opacity: 1,
    });
    gsap.to(".items", {
      pointerEvents: "all",
      width: itemsWidth.current,
      delay: 0.2,
      padding: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(document.querySelector(".dotted-container"), {
      width: containerInitialRect.current.width,
      duration:1,
      delay:.6
    });
    items.map((item, i) => {
      const tl = gsap.timeline();
      tl.to(item, {
        delay: i * 0.1 + 0.5,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    });
  };
  useEffect(() => {
    itemsWidth.current =
      document.querySelector("div.items")?.getBoundingClientRect().width || 0;
    _Draggable.create(container.current, {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: window,
      inertia: true,
      onDrag(e) {
        const rect = container.current.getBoundingClientRect();
        // dottedContainer.current.style.width = rect.width + "px";
        // dottedContainer.current.style.height = rect.height + "px";
        dottedContainer.current.style.left =
          containerInitialRect.current.x + "px";
        dottedContainer.current.style.top =
          containerInitialRect.current.y + "px";
        dottedContainer.current.style.height = rect.height + "px";

        const x = e.clientX || e?.touches?.[0]?.clientX - containerInitialRect.current.x;
        const y = e.clientY || e?.touches?.[0]?.clientY - containerInitialRect.current.y;
        const distance = Math.sqrt(x * x + y * y);

        distanceFromInitialPos.current = distance;

        if (distance < snappingRadius) {
          dottedContainer.current.style.opacity = 1;
        } else {
          dottedContainer.current.style.opacity = 0;
        }
      },
      onDragEnd() {
        if (distanceFromInitialPos.current < snappingRadius) {
          gsap.to(".menu-container", {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          });
        }
      },
    });

    const containerRect = container.current.getBoundingClientRect();
    containerInitialRect.current = containerRect;

    openMenu();

    return () => {};
  }, []);

  useEffect(() => {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }

    return () => {};
  }, [open]);

  return (
    <>
      <div ref={dottedContainer} className="dotted-container"></div>
      <div ref={container} className="menu-container">
        <h1>M/N</h1>
        <div className="items">
          <div className="item">work</div>
          <div className="item">aboout</div>
          <div className="item">contact</div>
        </div>
        <button onClick={() => setOpen((o) => !o)} className="toggle-button">
          <X className="size-6 icon-x icon" />
          <Menu className="size-6 icon-menu icon" />
        </button>
      </div>
    </>
  );
};

export default Draggable;
