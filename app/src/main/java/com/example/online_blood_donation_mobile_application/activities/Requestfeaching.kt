package com.example.online_blood_donation_mobile_application.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.adapter.DonorAdapter
import com.example.online_blood_donation_mobile_application.adapter.RequestAdapter
import com.example.online_blood_donation_mobile_application.models.DonatorModel
import com.example.online_blood_donation_mobile_application.models.RequestorModel
import com.google.firebase.database.*

class Requestfeaching : AppCompatActivity() {

    private lateinit var requestRecyclerView: RecyclerView
    private lateinit var tvLoadingData: TextView
    private lateinit var requestList: ArrayList<RequestorModel>
    private lateinit var dbRef: DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_requestfeaching)

        val backD = findViewById<ImageView>(R.id.imageView9)

        backD.setOnClickListener {
            val intent = Intent(this, Dashboard::class.java)
            startActivity(intent)
        }

        requestRecyclerView = findViewById(R.id.rvRequest)
        requestRecyclerView.layoutManager = LinearLayoutManager(this)
        requestRecyclerView.setHasFixedSize(true)
        tvLoadingData = findViewById(R.id.tvLoadingData)

        requestList = arrayListOf<RequestorModel>()

        getRequestorData()
    }

    private fun  getRequestorData() {

        requestRecyclerView.visibility = View.GONE
        tvLoadingData.visibility = View.VISIBLE

        dbRef = FirebaseDatabase.getInstance().getReference("Requestor")

        dbRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                requestList.clear()
                if (snapshot.exists()){
                    for (empSnap in snapshot.children){
                        val donorData = empSnap.getValue(RequestorModel::class.java)
                        requestList.add(donorData!!)
                    }
                    val mAdapter = RequestAdapter(requestList)
                    requestRecyclerView.adapter = mAdapter

//                    mAdapter.setOnItemClickListener(object : DonorAdapter.onItemClickListener{
//                        override fun onItemClick(position: Int) {
//
//                            val intent = Intent(this@Donarfeaching, DonarDetails::class.java)
//
//                            //put extras
//                            intent.putExtra("donatorId", donorList[position].donatorId)
//                            intent.putExtra("name", donorList[position].name)
//                            intent.putExtra("group", donorList[position].group)
//                            intent.putExtra("address", donorList[position].address)
//                            intent.putExtra("number", donorList[position].number)
//                            intent.putExtra("status", donorList[position].status)
//                            intent.putExtra("nic", donorList[position].nic)
//                            startActivity(intent)
//                        }
//
//                    })

                    requestRecyclerView.visibility = View.VISIBLE
                    tvLoadingData.visibility = View.GONE
                }
            }

            override fun onCancelled(error: DatabaseError) {
                TODO("Not yet implemented")
            }

        })
    }
}