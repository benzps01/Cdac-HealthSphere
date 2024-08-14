import { useState } from "react"
import { Accordion, AccordionCollapse } from "react-bootstrap"

// const AccordionItem = ({title, content, isOpen, onToggle}) => {
//     return (
//         <div className="accordion-item">
//             <div className="accordion-header" onClick={onToggle}>
//                 <h3>{title}</h3>
//                 <span>{isOpen ? '-' : '+'}</span>
//             </div>
//             {isOpen && <div className="accordion-content">{content}</div>}
//         </div>
//     )
// }

// const AccordionUsage = ({items}) => {
//     const [openIndex, setOpenIndex] = useState(null)

//     const handleToggle = (index) => {
//         setOpenIndex(index === openIndex ? null : index)
//     }

//     return(
//         <div classname="Accordion">
//             {items.map((item, index) => (
//                 <AccordionItem 
//                 key={index}
//                 title={item.title}
//                 content={item.content}
//                 isOpen={index === openIndex}
//                 onToggle={() => handleToggle(index)}
//                 />
//             ))}
//         </div>
//     )
// }


function AccordionUsage(){
    const treated = () =>{
        AccordionCollapse.apply(this, arguments)
    }
    return (
        <Accordion>
            <Accordion.Item eventKey="0"> 
                <Accordion.Header>Accordion 1
                </Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion 2
                </Accordion.Header>
                <Accordion.Body>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                    quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                    aspernatur aut odit aut fugit, sed quia consequuntur magni
                    dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                    quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                    adipisci velit, sed quia non numquam eius modi tempora incidunt
                    ut labore et dolore magnam aliquam quaerat voluptatem.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Accordion 3
                </Accordion.Header>
                <Accordion.Body>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui
                    blanditiis praesentium voluptatum deleniti atque corrupti quos
                    dolores et quas molestias excepturi sint occaecati cupiditate non
                    provident, similique sunt in culpa qui officia deserunt mollitia
                    animi, id est laborum et dolorum fuga. Et harum quidem rerum
                    facilis est et expedita distinctio. Nam libero tempore, cum
                    soluta nobis est eligendi optio cumque nihil impedit quo
                    minus id quod maxime placeat facere possimus, omnis voluptas
                    assumenda est, omnis dolor repellendus.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Accordion 4
                </Accordion.Header>
                <Accordion.Body>
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit
                    esse quam nihil molestiae consequatur, vel illum qui dolorem eum
                    fugiat quo voluptas nulla pariatur?
                    <button onClick={treated} className="treated">Treated</button>
                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    )
}
export default AccordionUsage