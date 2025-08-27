const mockData2 = {
  data: [
    {
      response: {
        header: {
          resultCode: "0000",
          resultMsg: "ok",
        },
        body: {
          items: {
            item: [
              {
                deskname: "DG1", // 출국장
                espwaittime: "D", // 예상 대기시간
                immigrationtime: "NA", // 출국심사 소요시간
                island: "1", // 출국장 번호
                occurrtime: "20230606000000", // 발생일시
                quelength: "0", // 대기인원수
                terminalid: "P01", // 터미널
              },
              {
                deskname: "DG2_W",
                espwaittime: "300",
                immigrationtime: "30",
                island: "1",
                occurrtime: "20230606000000",
                quelength: "13",
                terminalid: "P01",
              },
              {
                deskname: "DG2_E",
                espwaittime: "60",
                immigrationtime: "180",
                island: "4",
                occurrtime: "20230606000000",
                quelength: "47",
                terminalid: "P01",
              },
              {
                deskname: "DG3_W",
                espwaittime: "34",
                immigrationtime: "40",
                island: "3",
                occurrtime: "20230606000000",
                quelength: "20",
                terminalid: "P01",
              },
              {
                deskname: "DG3_E",
                espwaittime: "40",
                immigrationtime: "190",
                island: "4",
                occurrtime: "20230606000000",
                quelength: "10",
                terminalid: "P01",
              },

              {
                deskname: "DG4_W",
                espwaittime: "30",
                immigrationtime: "NA",
                island: "2",
                occurrtime: "20230606000000",
                quelength: "3",
                terminalid: "P01",
              },
              {
                deskname: "DG4_E",
                espwaittime: "D",
                immigrationtime: "190",
                island: "3",
                occurrtime: "20230606000000",
                quelength: "49",
                terminalid: "P01",
              },
              {
                deskname: "DG5_W",
                espwaittime: "278",
                immigrationtime: "NA",
                island: "3",
                occurrtime: "20230606000000",
                quelength: "12",
                terminalid: "P01",
              },
              {
                deskname: "DG5_E",
                espwaittime: "D",
                immigrationtime: "NA",
                island: "5",
                occurrtime: "20230606000000",
                quelength: "0",
                terminalid: "P01",
              },
              {
                deskname: "DG6",
                espwaittime: "D",
                immigrationtime: "NA",
                island: "6",
                occurrtime: "20230606000000",
                quelength: "0",
                terminalid: "P01",
              },
            ],
          },
        },
      },
    },
  ],
};

export default mockData2;
