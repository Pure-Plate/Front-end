import memil from "../../../assets/Icons/memil.svg";

const CustomWindow = ({ title, image }) => {
  const htmlString = `
        <!-- Sikdang-pin-->
        <div style="
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
            border-radius: 0px 0px 10px 10px;
        ">
            <!-- 말풍선 -->
            <div style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 5.735px;
                border-radius: 0px 0px 10px 10px;
            ">
                <!-- rectangle 184 -->
                <div style="
                    width: 142.231px;
                    height: 220.802px;
                    border-radius: 7.005px;
                    border: 1.171px solid #76C7B7;
                    background: #FFF;
                ">
                    <!-- contents -->
                    <div style="
                        display: flex;
                        width: 142.231px;
                        height: 220.802px;
                        padding-top: 2.294px;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        left: -1px;
                        top: -2.294px;
                    ">
                        <!-- Rectangle 185-->
                        <div style="
                            flex: 1 0 0;
                            align-self: stretch;
                            border-radius: 7.005px;
                            border: 1.171px solid #76C7B7;
                            background: url(${image || memil}) 50% / cover no-repeat;
                        ">
                        </div>
                        <!-- Textbox -->
                        <div style="
                            display: flex;
                            padding: 5.735px 0px;
                            padding-bottom: 10px;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        ">
                            <!-- title -->
                            <div style="
                                display: flex;
                                padding: 5.735px 0px;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                            ">
                                <h3 style="
                                    color: #3E4958;
                                    text-align: center;
                                    font-family: 'Anek Bangla';
                                    font-size: 16.554px;
                                    font-style: normal;
                                    font-weight: 800;
                                    line-height: 149.8%; /* 24.798px */
                                ">${title}</h3>
                            </div>
                            <!-- Rate -->
                            <div style="
                                display: flex;
                                align-items: center;
                                gap: 7.456px;
                            ">
                                <!-- 4.5 -->
                                <h1 style="
                                    color: #3E4958;
                                    font-family: 'Anek Bangla';
                                    font-size: 12.416px;
                                    font-style: normal;
                                    font-weight: 300;
                                    line-height: normal;
                                ">★4.5</h1>
                                <!-- Rate -->
                                <div style="
                                    width: 1.035px;
                                    height: 19.658px;
                                    border: 1.035px solid #E0E0E0;
                                    background: rgba(189, 189, 189, 0.50);
                                "></div>
                                <!-- reviews -->
                                <h1 style="
                                    color: #3E4958;
                                    font-family: 'Anek Bangla';
                                    font-size: 12.416px;
                                    font-style: normal;
                                    font-weight: 300;
                                    line-height: normal;
                                ">48 Reviews</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  return htmlString;
};

export default CustomWindow;
